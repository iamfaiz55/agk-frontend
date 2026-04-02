
export interface BuildingImage {
    id: number;
    url: string;
    title?: string;
    isCarousel: boolean;
    isHeroDesktop: boolean;
    isHeroMobile: boolean;
    displayOrder: number;
    buttonText?: string;
    buttonLink?: string;
    buildingId: number;
    unitId?: number | null;
    isGallery: boolean;
    isAdminAsset?: boolean;
    thumbnailUrl?: string;
    mediumUrl?: string;
}

export interface GalleryItem {
    id: number;
    imageUrl: string;
    description: string;
    buildingId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Unit {
    id: number;
    buildingId: number;
    name?: string; // Unit name like G1, F1, etc.
    type: 'shop' | 'office' | 'flat';
    price: number;
    size: string;
    details?: string;
    status: 'available' | 'sold' | 'reserved';
    floorNumber?: number;
    bedrooms?: number;
    bathrooms?: number;
    extraAmenities?: string;
    images: string[] | { url: string; thumbnailUrl?: string }[];
    building?: Building;
    flatNumber?: string;
    unitNumber?: string;
    area?: string;
}

export interface Amenity {
    id: number | string;
    name: string;
    icon: string;
    description: string;
    buildingId?: number;
}

export interface BuildingImageSection {
    title: string;
    images: string[];
}

export interface Building {
    id: number;
    name: string;
    address: string;
    description: string;
    tagline?: string;
    commercialFeatures?: string[];
    residentialFeatures?: string[];
    investmentPoints?: string[];
    units: Unit[];
    images: BuildingImageSection[];
    amenities: Amenity[];
    shops?: number;
    offices?: number;
    flats?: number;
}

export interface User {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'contacted' | 'closed';
    buildingId?: number;
    building?: Building;
    createdAt?: string;
    updatedAt?: string;
}

export interface AdminStats {
    totalProjects: number;
    totalBuildings: number;
    totalUnits: number;
    availableUnits: number;
    reservedUnits: number;
    soldUnits: number;
    totalLeads: number;
    newLeads: number;
    totalUsers: number;
    activeUsers: number;
}

export interface UserDocument {
    id: number;
    userId: number;
    type: 'aadhaar' | 'pan' | 'address_proof' | 'income_proof' | 'addressProof' | 'incomeProof' | 'other';
    url: string;
    details?: string;
    status: 'pending' | 'verified' | 'rejected';
    createdAt: string;
    updatedAt?: string;
}

export interface UnitRequest {
    id: number;
    unitId: number;
    userId: number;
    status: 'pending' | 'approved' | 'rejected' | 'confirmed' | 'reserved' | 'cancelled';
    message?: string;
    createdAt: string;
    updatedAt?: string;
    unit?: Unit;
    user?: User;
}

export interface CreateUnitRequestPayload {
    unitId: number;
    userId: number;
    message?: string;
}
