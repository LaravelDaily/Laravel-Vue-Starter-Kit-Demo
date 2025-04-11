<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, PaginatedResponse, TaskCategory } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Tasks',
        href: '/tasks',
    },
    {
        title: 'Task Categories',
        href: '/task-categories',
    },
];

interface Props {
    taskCategories: PaginatedResponse<TaskCategory>;
}

defineProps<Props>();

const deleteCategory = (taskCategory: TaskCategory) => {
    if (taskCategory.tasks_count === 0) {
        if (confirm('Are you sure you want to delete this task category?')) {
            router.delete(route('task-categories.destroy', taskCategory.id));
            toast.success('Task Category deleted successfully');
        }
    } else {
        if (
            confirm(
                'This category has tasks assigned to it. Are you sure you want to delete it? This will also delete all the tasks assigned to this category.',
            )
        ) {
            router.delete(route('task-categories.destroy', taskCategory.id));
            toast.success('Task Category deleted successfully');
        }
    }
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Task Categories List" />

        <div class="mt-4">
            <Link :class="buttonVariants({ variant: 'outline' })" href="/task-categories/create"> Create Task Category </Link>
        </div>

        <Table class="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead class="w-[200px] text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="category in taskCategories.data" :key="category.id">
                    <TableCell>{{ category.name }}</TableCell>
                    <TableCell class="flex gap-x-2 text-right">
                        <Link :class="buttonVariants({ variant: 'default' })" :href="`/task-categories/${category.id}/edit`">Edit </Link>
                        <Button variant="destructive" @click="deleteCategory(category)" class="mr-2">Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <Pagination :resource="taskCategories" />
    </AppLayout>
</template>
