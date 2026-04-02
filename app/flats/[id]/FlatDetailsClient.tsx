'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageCarousel from '@/components/ui/ImageCarousel';
import Button from '@/components/ui/Button';
import { flatsData } from '@/data/mockData';

export default function FlatDetailsClient() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const flat = flatsData.find(f => f.id === id);

  if (!flat) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Flat Not Found</h1>
          <p className="text-gray-600 mb-8">The flat you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    booked: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="h-20"></div> {/* Spacer for fixed navbar */}

      {/* Image Gallery */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Desktop: Large image with thumbnails */}
            <div className="hidden lg:grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <div className="relative h-[600px] rounded-xl overflow-hidden">
                  <Image
                    src={flat.images[0] || flat.image}
                    alt={`Flat ${flat.flatNumber}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {flat.images.slice(1, 4).map((img, index) => (
                  <div key={index} className="relative h-[190px] rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Flat ${flat.flatNumber} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Carousel */}
            <div className="lg:hidden">
              <ImageCarousel
                images={(flat.images.length > 0 ? flat.images : [flat.image]).map((url, i) => ({ id: i, url }))}
                className="h-[400px]"
                autoPlay
                interval={4000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flat Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    Flat {flat.flatNumber}
                  </h1>
                  <p className="text-xl text-gray-600">{flat.type} • Floor {flat.floor}</p>
                </div>
                <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${statusColors[flat.status]}`}>
                  {flat.status.toUpperCase()}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Area</p>
                    <p className="text-xl font-bold text-gray-900">{flat.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="text-xl font-bold text-gray-900">{flat.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bedrooms</p>
                    <p className="text-xl font-bold text-gray-900">{flat.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bathrooms</p>
                    <p className="text-xl font-bold text-gray-900">{flat.bathrooms}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{flat.description}</p>
              </div>

              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941E] rounded-xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm text-white/90 mb-2">Price</p>
                    <p className="text-4xl font-bold">{flat.price}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-white/10 border-white text-white hover:bg-white/20"
                      onClick={() => router.push('/#contact')}
                    >
                      Request Call Back
                    </Button>
                    <Button
                      size="lg"
                      className="bg-[#D4AF37] text-black hover:bg-[#B8941E] font-bold"
                      onClick={() => router.push('/#contact')}
                    >
                      Book This Flat
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/projects">
                  <Button variant="outline">← Back to Project</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">← Back to Home</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
