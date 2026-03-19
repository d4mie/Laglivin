import { redirect } from "next/navigation";

// WordPress default permalinks are often /yyyy/mm/dd/slug/.
// Redirect them to the headless articles route.
export default function WpPermalinkRedirect({ params }) {
  redirect(`/articles/${params.slug}`);
}

