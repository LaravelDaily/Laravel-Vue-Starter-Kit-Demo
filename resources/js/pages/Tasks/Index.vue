<script setup lang="ts">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/AppLayout.vue';
import { type Task } from '@/types';
import { Head } from '@inertiajs/vue3';

interface Props {
    tasks: Task[];
}

defineProps<Props>();
</script>

<template>
    <AppLayout>
        <Head title="Index" />
        <Table class="mt-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead class="w-[100px]">Status</TableHead>
                    <TableHead class="w-[100px] text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="task in tasks" :key="task.id">
                    <TableCell>{{ task.name }}</TableCell>
                    <TableCell :class="{ 'text-green-600': task.is_completed, 'text-red-700': !task.is_completed }">
                        {{ task.is_completed ? 'Completed' : 'In Progress' }}
                    </TableCell>
                    <TableCell class="text-right">Button to edit/delete</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </AppLayout>
</template>
