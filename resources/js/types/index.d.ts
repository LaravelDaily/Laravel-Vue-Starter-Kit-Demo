import type { PageProps } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-vue-next';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: number;
    name: string;
    is_completed: boolean;
    due_date?: string | null;
    mediaFile?: MediaFile;
    created_at: string;
    updated_at: string;
}

export interface PaginatedResponse<T = Task | null> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MediaFile {
    id: number,
    model_type: string,
    model_id: number,
    uuid: string,
    collection_name: string,
    name: string,
    file_name: string,
    mime_type: string,
    disk: string,
    conversions_disk: string,
    size: number,
    manipulations: string[],
    custom_properties: string[],
    generated_conversions: string[],
    responsive_images: string[],
    order_column: number,
    created_at: string,
    updated_at: string,
    original_url: string,
    preview_url: string,
}

export type BreadcrumbItemType = BreadcrumbItem;
