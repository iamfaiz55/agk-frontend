
import UnitDetailsClient from './UnitDetailsClient';

interface PageProps {
    params: Promise<{ id: string; unitId: string }>;
}

export default async function UnitPage({ params }: PageProps) {
    return <UnitDetailsClient params={params} />;
}

export async function generateStaticParams() {
    try {
        const response = await fetch('https://api.agkinfrastructures.com/api/units/?limit=1000');
        const units = await response.json();

        if (!Array.isArray(units)) return [];

        return units.map((unit: { id: number; buildingId?: number; building?: { id: number } }) => ({
            id: unit.buildingId?.toString() || unit.building?.id?.toString(),
            unitId: unit.id?.toString(),
        })).filter((param: { id?: string; unitId?: string }) => param.id && param.unitId);
    } catch (error) {
        console.error('Error fetching units for static generation:', error);
        return [];
    }
}
