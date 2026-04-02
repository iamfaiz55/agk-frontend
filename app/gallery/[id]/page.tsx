
import GalleryDetailClient from './GalleryDetailClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function GalleryPage({ params }: PageProps) {
    return <GalleryDetailClient params={params} />;
}

export async function generateStaticParams() {
    try {
        const response = await fetch('https://api.agkinfrastructures.com/api/projects/');
        const projects = await response.json();

        if (!Array.isArray(projects)) return [];

        return projects.map((project: { id: number }) => ({
            id: project.id.toString(),
        }));
    } catch (error) {
        console.error('Error fetching projects for static generation:', error);
        return [];
    }
}
