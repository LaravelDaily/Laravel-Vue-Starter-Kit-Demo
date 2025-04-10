<script setup lang="ts">
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem, type Task } from '@/types';
import { Head, Link, router } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';

interface Props {
    tasks: Task[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tasks', href: '/tasks' },
];

defineProps<Props>();

const deleteTask = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
        router.delete(route('tasks.destroy', { id }));
        toast.success('Task deleted successfully');
    }
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head title="Index" />
        <div class="mt-4">
            <Link :class="buttonVariants({ variant: 'outline' })" href="/tasks/create"> Create Task </Link>
        </div>
        <Table class="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead class="w-[100px]">Status</TableHead>
                    <TableHead class="w-[100px] text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableRow v-for="task in tasks" :key="task.id">
                <TableCell>{{ task.name }}</TableCell>
                <TableCell :class="{ 'text-green-600': task.is_completed, 'text-red-700': !task.is_completed }">
                    {{ task.is_completed ? 'Completed' : 'In Progress' }}
                </TableCell>
                <TableCell class="flex gap-x-2 text-right">
                    <Link :class="buttonVariants({ variant: 'default' })" :href="`/tasks/${task.id}/edit`">Edit</Link>
                    <Button variant="destructive" @click="deleteTask(task.id)" class="mr-2">Delete</Button>
                </TableCell>
            </TableRow>
        </Table>
    </AppLayout>
</template>
