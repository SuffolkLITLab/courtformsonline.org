// Example: courtformsonline.org
// Redirect to the default jurisdiction (Massachusetts)
import { redirect } from 'next/navigation';
import { DEFAULT_PATH } from '../utils/jurisdiction';

export default function Page() {
  redirect(`/${DEFAULT_PATH}`);
}
