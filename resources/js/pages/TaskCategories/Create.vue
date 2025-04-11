<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
    {
        title: 'Task Categories',
        href: '/task-categories',
    },
    { title: 'Create', href: '/task-categories/create' },
];

const form = useForm({
    name: '',
});

const submitForm = () => {
    form.post(route('task-categories.store'), {
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
                            <Label htmlFor="name">Name *</Label>

                            <Input id="name" v-model="form.name" class="mt-1 block w-full" />

                            <InputError :message="form.errors.name" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div class="flex items-center gap-4">
                            <Button :disabled="form.processing" variant="default">Create Category</Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    </AppLayout>
</template>
