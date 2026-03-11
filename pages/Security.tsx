import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Key } from 'lucide-react';
import { SEO } from '../components/SEO';

const Security: React.FC = () => {
    const protocols = [
        {
            icon: <Lock className="h-6 w-6 text-neon-pink" />,
            title: "Encriptación de Extremo a Extremo",
            description: "Toda la comunicación entre nuestros servidores y los clientes está cifrada utilizando algoritmos robustos AES-256 y protocolos TLS 1.3 para garantizar la integridad y confidencialidad de los datos en tránsito."
        },
        {
            icon: <Server className="h-6 w-6 text-neon-pink" />,
            title: "Infraestructura Inmutable",
            description: "Desplegamos entornos aislados y efímeros. Nuestra infraestructura como código (IaC) garantiza que los servidores se reconstruyan desde cero con parches de seguridad actualizados de forma regular, minimizando la superficie de ataque."
        },
        {
            icon: <Shield className="h-6 w-6 text-neon-pink" />,
            title: "Auditorías Continuas",
            description: "Ejecutamos análisis de vulnerabilidades automatizados diarios y pruebas de penetración periódicas para identificar y cerrar brechas de seguridad antes de que puedan ser explotadas."
        },
        {
            icon: <Key className="h-6 w-6 text-neon-pink" />,
            title: "Control de Acceso Estricto",
            description: "Implementamos el principio de menor privilegio (PoLP). Todo el acceso interno está protegido por autenticación multifactor (MFA), auditorías de registros meticulosas y sistemas de gestión de identidad (IAM)."
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            <SEO 
                title="Protocolos de Seguridad | Quantum Code"
                description="Conoce nuestra arquitectura defensiva y protocolos de seguridad. Cómo Quantum Code protege tu información e infraestructura digital."
                canonicalUrl="/seguridad"
            />
            <div className="absolute inset-0 border-grid opacity-20 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-16">
                        <h2 className="text-neon-pink font-mono text-sm tracking-widest uppercase mb-4">Arquitectura Defensiva</h2>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                            Protocolos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-red-500">Seguridad</span>
                        </h1>
                        <p className="mt-6 text-gray-400 max-w-2xl text-lg font-sans">
                            En Quantum Code, abordamos la seguridad como una función central, no como una capa añadida. Nuestra arquitectura está diseñada para resistir amenazas persistentes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {protocols.map((protocol, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                                className="bg-white/5 border border-white/10 p-8 hover:border-neon-pink/50 transition-colors group"
                            >
                                <div className="mb-6 p-4 bg-black border border-white/10 inline-block group-hover:border-neon-pink/50 transition-colors">
                                    {protocol.icon}
                                </div>
                                <h3 className="text-xl text-white font-display mb-4 tracking-tight">{protocol.title}</h3>
                                <p className="text-gray-400 font-sans leading-relaxed text-sm">
                                    {protocol.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none text-gray-300 font-sans leading-relaxed border-t border-white/10 pt-12">
                        <h2 className="text-2xl text-white mb-6 font-display tracking-tight border-l-2 border-neon-pink pl-4">Reporte de Vulnerabilidades</h2>
                        <p className="mb-6">
                            Nos tomamos la seguridad muy en serio. Si cree que ha descubierto una vulnerabilidad de seguridad en cualquiera de nuestros sistemas, plataformas o en los de nuestros clientes, póngase en contacto con nuestro equipo de respuesta a incidentes de inmediato enviando un correo electrónico a <a href="mailto:global@quantumcode.art" className="text-neon-pink hover:text-white transition-colors">global@quantumcode.art</a>.
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default Security;
