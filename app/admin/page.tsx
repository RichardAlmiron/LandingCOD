import { redirect } from 'next/navigation';

export default function AdminRootPage() {
    // Redirige al login del admin
    redirect('/admin/login');
}
