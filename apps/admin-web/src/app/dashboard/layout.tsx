import SidebarWithHeader from '@/components/SidebarWithHeader';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SidebarWithHeader children={children} />
    </section>
  );
}
