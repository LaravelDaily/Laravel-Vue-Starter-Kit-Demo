<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem, Task } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    {
        title: 'Task Categories',
        href: '/task-categories',
    },
    { title: 'Edit', href: '' },
];

interface Props {
    taskCategory: Task;
}

const props = defineProps<Props>();

const taskCategory = props.taskCategory;

const form = useForm({
    name: taskCategory.name,
});

const submitForm = () => {
    form.put(route('task-categories.update', taskCategory.id), {
        preserveScroll: true,
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Edit Category" />
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <form class="space-y-6" @submit.prevent="submitForm">
                <div class="grid gap-2">
                    <Label htmlFor="name">Name *</Label>

                    <Input id="name" v-model="form.name" class="mt-1 block w-full" />

                    <InputError :message="form.errors.name" />
                </div>

                <div class="flex items-center gap-4">
                    <Button :disabled="form.processing" variant="default">Update Category</Button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>
