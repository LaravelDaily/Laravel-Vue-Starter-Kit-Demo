<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/AppLayout.vue';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Task } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import { DateFormatter, fromDate, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Edit', href: '' },
];

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

interface Props {
    task: Task;
}

const props = defineProps<Props>();

const task = props.task;

const form = useForm({
    name: task.name,
    is_completed: task.is_completed,
    due_date: task.due_date ? fromDate(new Date(task.due_date)) : null,
});

const submitForm = () => {
    form.transform((data) => ({
        ...data,
        due_date: data.due_date ? data.due_date.toDate(getLocalTimeZone()) : null,
    })).put(route('tasks.update', task.id), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Edit Task" />
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <form class="space-y-6" @submit.prevent="submitForm">
                <div class="grid gap-2">
                    <Label htmlFor="name">Task Name *</Label>

                    <Input id="name" v-model="form.name" class="mt-1 block w-full" />

                    <InputError :message="form.errors.name" />
                </div>

                <div class="grid gap-2">
                    <Label htmlFor="name">Due Date</Label>

                    <Popover>
                        <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                :class="cn('w-[280px] justify-start text-left font-normal', !form.due_date && 'text-muted-foreground')"
                            >
                                <CalendarIcon class="mr-2 h-4 w-4" />
                                {{ form.due_date ? df.format(new Date(form.due_date.toDate(getLocalTimeZone()))) : 'Pick a date' }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                            <Calendar v-model="form.due_date" initial-focus />
                        </PopoverContent>
                    </Popover>

                    <InputError :message="form.errors.due_date" />
                </div>

                <div class="grid gap-2">
                    <Label htmlFor="is_completed">Completed?</Label>

                    <Switch id="is_completed" v-model="form.is_completed" class="mt-1" />

                    <InputError :message="form.errors.is_completed" />
                </div>

                <div class="flex items-center gap-4">
                    <Button :disabled="form.processing" variant="default">Update Task</Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>