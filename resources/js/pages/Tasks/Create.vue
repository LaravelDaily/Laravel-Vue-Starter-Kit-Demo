<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/AppLayout.vue';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type TaskCategory } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import { DateFormatter, getLocalTimeZone } from '@internationalized/date';
import { CalendarIcon } from 'lucide-vue-next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

interface Props {
    categories: TaskCategory[];
}

const props = defineProps<Props>();

const categories = props.categories;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    { title: 'Create', href: '/tasks' },
];

const form = useForm({
    name: '',
    due_date: null,
    media: '',
    categories: [],
});

const fileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) {
        return;
    }

    form.media = file;
};

const submitForm = () => {
    form.transform((data) => ({
        ...data,
        due_date: data.due_date ? data.due_date.toDate(getLocalTimeZone()) : null,
    })).post(route('tasks.store'), {
        forceFormData: true,
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Create Task" />
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <form class="space-y-6" @submit.prevent="submitForm">
                <Card class="py-6">
                    <CardContent class="grid grid-cols-3 gap-4 space-y-6">
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
                                        {{ form.due_date ? df.format(form.due_date.toDate(getLocalTimeZone())) : 'Pick a date' }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar v-model="form.due_date" initial-focus />
                                </PopoverContent>
                            </Popover>

                            <InputError :message="form.errors.due_date" />
                        </div>

                        <div class="grid gap-2">
                            <Label htmlFor="name">Media</Label>

                            <Input type="file" id="name" v-on:change="fileSelected($event)" class="mt-1 block w-full" />

                            <progress v-if="form.progress" :value="form.progress.percentage" max="100">{form.progress.percentage}%</progress>

                            <InputError :message="form.errors.media" />
                        </div>

                        <div class="grid gap-2">
                            <Label htmlFor="categories">Categories</Label>

                            <ToggleGroup type="multiple" variant="outline" size="lg" v-model="form.categories">
                                <ToggleGroupItem v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <InputError :message="form.errors.categories" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div class="flex items-center gap-4">
                            <Button :disabled="form.processing" variant="default">Create Task</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </AppLayout>
</template>
