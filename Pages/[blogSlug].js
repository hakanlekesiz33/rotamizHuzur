import { useRouter } from 'next/router';

export default function Blog() {
    const router = useRouter();
    console.log(router);
    return (
        <>
            {/* <h1>{router.query.id}</h1> */}
            <p>This is the blog post content.</p>
        </>
    );
}