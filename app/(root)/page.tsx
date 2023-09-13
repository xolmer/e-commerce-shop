import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="p-5">
      <Button size="default" variant={`destructive`}>
        Click me
      </Button>
    </div>
  );
}
