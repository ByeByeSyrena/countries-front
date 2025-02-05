export const dynamic = 'force-static';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  redirect(`/list`);
}