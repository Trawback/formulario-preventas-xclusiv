'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  RegisterFormSchema,
  type RegisterFormData,
  type PrendaSeleccionada,
  TALLAS_DISPONIBLES,
  PRENDA_PREVENTA,
  CONTACTO_OPTIONS,
  METODO_ENTREGA_OPTIONS,
  DIA_COMPETENCIA_OPTIONS,
  type RegisterApiResponse,
} from '@/lib/types';
import { RECAPTCHA_SITE_KEY } from '@/lib/config';
import { extractUtmParams } from '@/lib/utils';

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<{
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  }>({});
  const [emailInput, setEmailInput] = useState('');
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [countryCode, setCountryCode] = useState('+52'); // México por defecto
  const [prendasSeleccionadas, setPrendasSeleccionadas] = useState<PrendaSeleccionada[]>([]);

  // Prendas disponibles con sus imágenes
  const prendas = [
    {
      id: 'Hoodie XSV1',
      nombre: 'Hoodie "XSV1"',
      descripcion: 'Unisex, Gramaje 350gr/m2, 100% algodón, técnica "Puff", Sin cordones.',
      precio: '$899.00 mxn',
      imagen: '/Resources/Hoodie%20Boxy%20Frente%20mockup_Mesa%20de%20trabajo%201%20copia-10.png',
    },
    {
      id: 'Tank Top XSV2',
      nombre: 'Tank Top "XSV2"',
      descripcion: 'Gramaje 200gr/m2, sin mangas, corte regular',
      precio: '$549.00 mxn',
      imagen: '/Resources/Diseño sin título (3).png', // Temporal
    },
    {
      id: 'Cropped Boxy "XSV3"',
      nombre: 'Cropped Boxy "XSV3"',
      descripcion: 'Gramaje 200gr/m2, sin mangas, corte boxy.',
      precio: '$579.00 mxn',
      imagen: '/Resources/T.T Cropped Frente mockup_Mesa de trabajo 1 copia-10.png', // Temporal
    },
  ];

  // Dominios comunes para sugerir
  const emailDomains = [
    '@gmail.com',
    '@hotmail.com',
    '@outlook.com',
    '@yahoo.com',
  ];

  // Códigos de país (LADA) comunes
  const countryCodes = [
    { code: '+52', country: 'México', flag: '🇲🇽' },
    { code: '+1', country: 'USA/Canadá', flag: '🇺🇸' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+34', country: 'España', flag: '🇪🇸' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+51', country: 'Perú', flag: '🇵🇪' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  ];

  // Estados de México (32 estados)
  const estadosMexico = [
    'Extranjero',
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      consent_marketing: false,
      prendas_seleccionadas: [],
    },
  });

  // Función para normalizar nombre y apellido (mayúsculas, sin acentos, sin caracteres especiales)
  const normalizeNameInput = (value: string): string => {
    return value
      .toUpperCase() // Convertir a mayúsculas
      .normalize('NFD') // Normalizar para separar acentos
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^A-Z\s]/g, ''); // Solo letras mayúsculas y espacios
  };

  // Generar sugerencias de email
  const getEmailSuggestions = (): string[] => {
    if (!emailInput || emailInput.includes('@')) {
      return [];
    }
    return emailDomains.map(domain => emailInput + domain);
  };

  // Seleccionar una sugerencia de email
  const selectEmailSuggestion = (suggestion: string) => {
    setValue('email', suggestion);
    setEmailInput(suggestion);
    setShowEmailSuggestions(false);
  };

  // Observar el campo de contacto para mostrar/ocultar Instagram
  const contactoSeleccionado = watch('contacto');

  // Capturar parámetros UTM al cargar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = extractUtmParams(window.location.href);
      setUtmParams(params);
    }
  }, []);

  // Actualizar el formulario cuando cambien las prendas seleccionadas
  useEffect(() => {
    setValue('prendas_seleccionadas', prendasSeleccionadas, { shouldValidate: true });
  }, [prendasSeleccionadas, setValue]);

  // Funciones para manejar la selección de prendas
  const togglePrenda = (prenda: { id: string; nombre: string }) => {
    setPrendasSeleccionadas(prev => {
      const existe = prev.find(p => p.prenda_id === prenda.id);
      if (existe) {
        // Si existe, la removemos
        return prev.filter(p => p.prenda_id !== prenda.id);
      } else {
        // Si no existe, la agregamos con valores por defecto
        return [...prev, {
          prenda_id: prenda.id,
          prenda_nombre: prenda.nombre,
          tallas: [],
          cantidad: 1,
        }];
      }
    });
  };

  const updatePrendaTalla = (prendaId: string, tallaIndex: number, talla: string) => {
    setPrendasSeleccionadas(prev =>
      prev.map(p => {
        if (p.prenda_id === prendaId) {
          const newTallas = [...p.tallas];
          newTallas[tallaIndex] = talla;
          return { ...p, tallas: newTallas };
        }
        return p;
      })
    );
  };

  const updatePrendaCantidad = (prendaId: string, cantidad: number) => {
    setPrendasSeleccionadas(prev =>
      prev.map(p => {
        if (p.prenda_id === prendaId) {
          // Ajustar el array de tallas según la nueva cantidad
          const newTallas = Array(cantidad).fill('').map((_, i) => p.tallas[i] || '');
          return { ...p, cantidad, tallas: newTallas };
        }
        return p;
      })
    );
  };

  const isPrendaSeleccionada = (prendaId: string) => {
    return prendasSeleccionadas.some(p => p.prenda_id === prendaId);
  };

  const getPrendaData = (prendaId: string) => {
    return prendasSeleccionadas.find(p => p.prenda_id === prendaId);
  };

  // Función para obtener token de reCAPTCHA
  const getRecaptchaToken = async (): Promise<string | undefined> => {
    if (!RECAPTCHA_SITE_KEY) return undefined;

    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then((token: string) => {
              resolve(token);
            })
            .catch(() => {
              resolve(undefined);
            });
        });
      } else {
        resolve(undefined);
      }
    });
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Obtener token de reCAPTCHA si está configurado
      const recaptchaToken = await getRecaptchaToken();

      // Combinar datos del formulario con parámetros UTM
      const payload = {
        ...data,
        ...utmParams,
        recaptcha_token: recaptchaToken,
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result: RegisterApiResponse = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Error al registrar');
      }

      // Redirigir a página de gracias con lead_id
      if (result.lead_id) {
        window.location.href = `/gracias?lead_id=${result.lead_id}&email=${encodeURIComponent(data.email)}&nombre=${encodeURIComponent(data.nombre)}`;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Error al enviar el formulario. Por favor, intenta de nuevo.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative space-y-6 overflow-hidden rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-2xl backdrop-blur-sm md:p-12"
      id="registro-form"
    >
      {/* Gradiente decorativo superior */}
      <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600"></div>

      {/* Header del formulario */}
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-50 px-4 py-2">
          <span className="text-2xl"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-dark">
            Registro Preventa
          </span>
        </div>
        <h2 className="text-4xl font-black text-dark md:text-5xl">
          Colección CDMX 2025
        </h2>
        <p className="text-base font-medium text-gray-600">
          Completa el formulario y asegura tu <span className="font-bold text-primary-600">prenda</span>
        </p>
      </div>

      {/* Progress indicator visual */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-primary-500"></div>
        <div className="h-1.5 w-16 rounded-full bg-primary-500"></div>
        <div className="h-1.5 w-16 rounded-full bg-gray-200"></div>
      </div>

      {/* Sección: Información Personal */}
      <div className="space-y-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md">
            <span className="text-sm font-bold">1</span>
          </div>
          <h3 className="text-lg font-black text-dark">Información Personal</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group">
            <label className="label-field flex items-center gap-2">
              <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Nombre *
            </label>
            <input
              {...register('nombre', {
                onChange: (e) => {
                  const normalized = normalizeNameInput(e.target.value);
                  setValue('nombre', normalized);
                },
              })}
              type="text"
              placeholder="JUAN"
              className="input-field uppercase"
              disabled={isSubmitting}
            />
            {errors.nombre && (
              <p className="error-message">{errors.nombre.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">No incluir carácteres especiales , sin acentos ni números</p>
          </div>
          <div className="group">
            <label className="label-field">
              Apellido *
            </label>
            <input
              {...register('apellido', {
                onChange: (e) => {
                  const normalized = normalizeNameInput(e.target.value);
                  setValue('apellido', normalized);
                },
              })}
              type="text"
              placeholder="PEREZ"
              className="input-field uppercase"
              disabled={isSubmitting}
            />
            {errors.apellido && (
              <p className="error-message">{errors.apellido.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">No incluir carácteres especiales , sin acentos ni números</p>
          </div>
        </div>

        <div className="group relative">
          <label className="label-field flex items-center gap-2">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email *
          </label>
          <input
            {...register('email', {
              onChange: (e) => {
                const value = e.target.value;
                setEmailInput(value);
                // Mostrar sugerencias si no hay @ en el input y hay texto
                setShowEmailSuggestions(value.length > 0 && !value.includes('@'));
              },
            })}
            type="email"
            placeholder="tu@email.com"
            className="input-field"
            disabled={isSubmitting}
            onFocus={(e) => {
              const value = e.target.value;
              if (value.length > 0 && !value.includes('@')) {
                setShowEmailSuggestions(true);
              }
            }}
            onBlur={() => {
              // Pequeño delay para permitir el click en las sugerencias
              setTimeout(() => setShowEmailSuggestions(false), 200);
            }}
          />
          
          {/* Sugerencias de email */}
          {showEmailSuggestions && getEmailSuggestions().length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border-2 border-primary-200 bg-white shadow-xl">
              <div className="p-2">
                <p className="mb-2 px-3 text-xs font-semibold text-gray-500">Sugerencias:</p>
                {getEmailSuggestions().map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectEmailSuggestion(suggestion)}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 hover:bg-primary-50"
                  >
                    <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium text-dark group-hover:text-primary-600">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="group">
          <label className="label-field flex items-center gap-2">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            WhatsApp *
          </label>
          <div className="flex gap-2">
            {/* Selector de código de país */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="input-field w-32 flex-shrink-0 cursor-pointer text-sm font-semibold"
              disabled={isSubmitting}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            
            {/* Input del número */}
            <input
              {...register('whatsapp')}
              type="tel"
              placeholder="56 7488 2212"
              className="input-field flex-1"
              disabled={isSubmitting}
              onChange={(e) => {
                // Solo permitir números y espacios
                const value = e.target.value.replace(/[^\d\s]/g, '');
                e.target.value = value;
              }}
              onBlur={(e) => {
                // Agregar el código de país al perder el foco si hay un número
                const numberOnly = e.target.value.replace(/\D/g, '');
                if (numberOnly) {
                  setValue('whatsapp', `${countryCode} ${numberOnly}`, { shouldValidate: true });
                }
              }}
              onFocus={(e) => {
                // Limpiar el código de país si está presente para facilitar edición
                const currentValue = e.target.value;
                if (currentValue.includes('+')) {
                  const numberPart = currentValue.replace(/^\+\d+\s*/, '');
                  e.target.value = numberPart;
                }
              }}
            />
          </div>
          {errors.whatsapp && (
            <p className="error-message">{errors.whatsapp.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Selecciona tu país e ingresa tu número sin el código de área
          </p>
        </div>

        <div className="group">
          <label className="label-field flex items-center gap-2">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Estado
          </label>
          <select
            {...register('ciudad')}
            className="input-field cursor-pointer"
            disabled={isSubmitting}
          >
            <option value="">Selecciona tu estado</option>
            {estadosMexico.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          {errors.ciudad && (
            <p className="error-message">{errors.ciudad.message}</p>
          )}
        </div>

        <div className="group">
          <label className="label-field flex items-center gap-2">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ¿Asistirás al evento? *
          </label>
          <select
            {...register('dia_competencia')}
            className="input-field cursor-pointer"
            disabled={isSubmitting}
          >
            <option value="">Selecciona una opción</option>
            {DIA_COMPETENCIA_OPTIONS.map((dia) => (
              <option key={dia.value} value={dia.value}>
                {dia.label}
              </option>
            ))}
          </select>
          {errors.dia_competencia && (
            <p className="error-message">{errors.dia_competencia.message}</p>
          )}
        </div>
      </div>

      {/* Sección: Detalles del Pedido */}
      <div className="space-y-4 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md">
            <span className="text-sm font-bold">2</span>
          </div>
          <h3 className="text-lg font-black text-dark">Detalles del Pedido</h3>
        </div>

        {/* Selector de Prendas - Selección múltiple */}
        <div className="space-y-4">
          <label className="label-field flex items-center gap-2">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Selecciona tus Prendas * (Máximo 3)
          </label>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {prendas.map((prenda) => (
              <div key={prenda.id} className="space-y-3">
                {/* Tarjeta de la prenda */}
                <div
                  onClick={() => togglePrenda({ id: prenda.id, nombre: prenda.nombre })}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    isPrendaSeleccionada(prenda.id)
                      ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-white shadow-lg shadow-primary-500/20'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                  }`}
                >
                  {/* Checkbox si está seleccionado */}
                  <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border-2 bg-white shadow-md transition-all">
                    {isPrendaSeleccionada(prenda.id) ? (
                      <div className="h-full w-full rounded bg-primary-500 flex items-center justify-center">
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-full w-full border-gray-300"></div>
                    )}
                  </div>
                  
                  {/* Imagen de la prenda */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                    <Image
                      src={prenda.imagen}
                      alt={prenda.nombre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  
                  {/* Información de la prenda */}
                  <div className="p-4">
                    <h4 className="text-sm font-black text-dark">{prenda.nombre}</h4>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">{prenda.descripcion}</p>
                    <p className="mt-2 text-lg font-black text-primary-600">{prenda.precio}</p>
                  </div>
                </div>

                {/* Campos de cantidad y tallas si está seleccionada */}
                {isPrendaSeleccionada(prenda.id) && (
                  <div className="animate-slide-down space-y-3 rounded-xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-4">
                    {/* Selector de cantidad */}
                    <div>
                      <label className="label-field text-xs">Cantidad * (Máximo 3)</label>
                      <select
                        value={getPrendaData(prenda.id)?.cantidad || 1}
                        onChange={(e) => updatePrendaCantidad(prenda.id, parseInt(e.target.value))}
                        className="input-field text-sm font-semibold"
                        disabled={isSubmitting}
                      >
                        <option value={1}>1 prenda</option>
                        <option value={2}>2 prendas</option>
                        <option value={3}>3 prendas</option>
                      </select>
                    </div>

                    {/* Selectores de talla según cantidad */}
                    <div className="space-y-2">
                      {Array.from({ length: getPrendaData(prenda.id)?.cantidad || 1 }).map((_, index) => (
                        <div key={index}>
                          <label className="label-field text-xs">
                            Talla #{index + 1} *
                          </label>
                          <select
                            value={getPrendaData(prenda.id)?.tallas[index] || ''}
                            onChange={(e) => updatePrendaTalla(prenda.id, index, e.target.value)}
                            className="input-field text-sm font-semibold"
                            disabled={isSubmitting}
                          >
                            <option value="">Selecciona talla</option>
                            {TALLAS_DISPONIBLES.map((talla) => (
                              <option key={talla.value} value={talla.value}>
                                {talla.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {errors.prendas_seleccionadas && (
            <p className="error-message">{errors.prendas_seleccionadas.message}</p>
          )}
        </div>

        {/* Disclaimer de Pago y Envío */}
        <div className="mt-4 rounded-xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-black text-dark mb-2 flex items-center gap-2">
                <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Proceso de Pago y Envío
              </h4>
              <div className="space-y-2 text-xs text-gray-700">
                <p className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">1.</span>
                  <span>Xclusiv te contactará para enviar un <span className="font-bold text-primary-600">link de pago seguro para proteger tu compra.</span></span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">2.</span>
                  <span>Al realizar el pago, podrás <span className="font-bold text-primary-600">elegir tu opción de envío</span> y proporcionar tus datos de entrega</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">3.</span>
                  <span>El pago se realizará una vez cerrada la preventa, si te contactamos antes es únicamente para notificarte que tu prenda esta asegurada.</span>
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold text-gray-700">Pago 100% seguro y protegido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Método de Entrega */}
      <div className="space-y-4 rounded-2xl bg-gradient-to-br from-blue-50 to-primary-50 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md">
            <span className="text-sm font-bold">3</span>
          </div>
          <h3 className="text-lg font-black text-dark">Método de Entrega</h3>
        </div>

        <fieldset>
          <legend className="sr-only">Selecciona tu método de entrega preferido</legend>
          <div className="space-y-3">
            {METODO_ENTREGA_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="group relative cursor-pointer block"
              >
                <input
                  {...register('metodo_entrega')}
                  type="radio"
                  value={option.value}
                  className="peer sr-only"
                  disabled={isSubmitting}
                />
                <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary-500 hover:shadow-md peer-checked:border-primary-500 peer-checked:bg-gradient-to-br peer-checked:from-primary-50 peer-checked:to-white peer-checked:shadow-lg peer-checked:shadow-primary-500/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {option.value === 'envio_nacional' && (
                        <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      )}
                      {option.value === 'entrega_presencial' && (
                        <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      {option.value === 'entrega_cdmx' && (
                        <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-dark flex items-center gap-2">
                        {option.label}
                        <svg className="h-5 w-5 opacity-0 text-primary-600 transition-opacity peer-checked:opacity-100 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </h4>
                      <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                        {option.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          {errors.metodo_entrega && (
            <p className="error-message">{errors.metodo_entrega.message}</p>
          )}
        </fieldset>
      </div>

      {/* Sección: Método de Contacto */}
      <div className="space-y-4 rounded-2xl bg-gradient-to-br from-purple-50 to-primary-50 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-md">
            <span className="text-sm font-bold">4</span>
          </div>
          <h3 className="text-lg font-black text-dark">Método de Contacto</h3>
        </div>

        <fieldset>
          <legend className="sr-only">Selecciona tu método de contacto preferido</legend>
          <div className="grid grid-cols-2 gap-3">
            {CONTACTO_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="group relative cursor-pointer"
              >
                <input
                  {...register('contacto')}
                  type="radio"
                  value={option.value}
                  className="peer sr-only"
                  disabled={isSubmitting}
                />
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white p-4 font-bold text-gray-700 shadow-sm transition-all duration-200 hover:border-primary-500 hover:shadow-md peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-primary-500/50">
                  {option.value === 'WhatsApp' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  )}
                  {option.value === 'Instagram' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    </svg>
                  )}
                  <span className="text-sm">{option.label}</span>
                  <svg className="ml-auto h-5 w-5 opacity-0 transition-opacity peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </label>
            ))}
          </div>
          {errors.contacto && (
            <p className="error-message">{errors.contacto.message}</p>
          )}
        </fieldset>

        {/* Instagram user - con animación de entrada */}
        {contactoSeleccionado === 'Instagram' && (
          <div className="animate-slide-up overflow-hidden">
            <label className="label-field flex items-center gap-2">
              <svg className="h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
              Usuario de Instagram
            </label>
            <input
              {...register('instagram_user')}
              type="text"
              placeholder="@tu_usuario"
              className="input-field"
              disabled={isSubmitting}
            />
            {errors.instagram_user && (
              <p className="error-message">{errors.instagram_user.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Consentimiento - con diseño mejorado */}
      <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm">
        <label className="flex cursor-pointer items-start gap-4 group">
          <input
            {...register('consent_marketing')}
            type="checkbox"
            className="peer mt-1 h-6 w-6 cursor-pointer rounded-lg border-2 border-gray-300 text-primary-600 transition-all hover:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            disabled={isSubmitting}
          />
          <div className="flex-1">
            <span className="block text-sm font-semibold leading-relaxed text-dark">
              Acepto ser contactado para la preventa y recibir información exclusiva
              <span className="ml-1 text-primary-600">*</span>
            </span>
            <span className="mt-1 block text-xs text-gray-600">
              Lee nuestra{' '}
              <a href="/privacidad" target="_blank" className="font-semibold text-primary-600 underline hover:text-primary-700">
                política de privacidad
              </a>
            </span>
          </div>
        </label>
        {errors.consent_marketing && (
          <p className="error-message mt-3">{errors.consent_marketing.message}</p>
        )}
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {/* Submit Button - máximo impacto */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary group relative w-full text-lg"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-6 w-6 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="font-bold">Procesando...</span>
            </>
          ) : (
            <>
              <span className="font-black">¡Enviar mi preventa!</span>
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-semibold">Pago Seguro</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Solo 48h</span>
          </div>
        </div>
      </div>

      {/* reCAPTCHA Badge Info */}
      {RECAPTCHA_SITE_KEY && (
        <p className="text-center text-xs text-gray-500">
          Este sitio está protegido por reCAPTCHA y se aplican la{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Política de privacidad
          </a>{' '}
          y los{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Términos de servicio
          </a>{' '}
          de Google.
        </p>
      )}
    </form>
  );
}

// Agregar tipos para grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

