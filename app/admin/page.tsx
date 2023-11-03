import WithAuth from '@/lib/withAuth';
import Home from './components/home/Home';
export default function Admin() {
  return (
    <WithAuth>
      <Home />
    </WithAuth>
  );
}
