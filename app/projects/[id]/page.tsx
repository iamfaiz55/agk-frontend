
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateStaticParams() {
    try {
        const response = await fetch('https://api.agkinfrastructures.com/api/projects/');
        const projects = await response.json();
        
        if (!Array.isArray(projects)) return [];
        
        return projects.map((project: { id: number }) => ({
            id: project.id.toString(),
        }));
    } catch (error) {
        console.error('Error generating static params for projects:', error);
        return [];
    }
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
    return <ProjectDetailsClient params={params} />;
}
