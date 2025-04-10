<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginatedResponse } from '@/types';
import { router } from '@inertiajs/vue3';

interface Props {
    resource: PaginatedResponse;
}

const props = withDefaults(defineProps<Props>(), {
    resource: null,
});
</script>

<template>
    <Pagination
        :items-per-page="props.resource.per_page"
        :total="props.resource.total"
        :sibling-count="1"
        show-edges
        :default-page="props.resource.current_page"
        class="mx-auto"
    >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <div v-if="props.resource.last_page === 1">
                <div class="mt-4 text-center text-gray-500">No more items to show.</div>
            </div>
            <div v-if="props.resource.last_page !== 1">
                <PaginationFirst v-on:click="() => router.visit(props.resource.first_page_url)" />
                <PaginationPrevious v-on:click="() => router.visit(props.resource.prev_page_url)" v-if="props.resource.prev_page_url" />

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button
                            class="h-10 w-10 p-0"
                            :variant="item.value === props.resource.current_page ? 'default' : 'outline'"
                            v-on:click="() =>  router.visit(props.resource.links[index+1].url)"
                        >
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext v-on:click="() => router.visit(props.resource.next_page_url)" v-if="props.resource.next_page_url" />
                <PaginationLast v-on:click="() => router.visit(props.resource.last_page_url)" />
            </div>
        </PaginationList>
    </Pagination>
</template>