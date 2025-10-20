'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormSchema,
  type RegisterFormData,
  TALLAS_DISPONIBLES,
  PRENDA_PREVENTA,
  CONTACTO_OPTIONS,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      consent_marketing: false,
      cantidad_estimada: 1,
    },
  });

  // Observar el campo de contacto para mostrar/ocultar Instagram
  const contactoSeleccionado = watch('contacto');

  // Capturar parámetros UTM al cargar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = extractUtmParams(window.location.href);
      setUtmParams(params);
    }
  }, []);

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
      className="space-y-4 rounded-2xl bg-white p-8 shadow-xl"
      id="registro-form"
    >
      <div className="text-center">
        <h2 className="heading-3 mb-2">Reserva tu lugar</h2>
        <p className="text-gray-600">
          Completa el formulario para asegurar tu preventa
        </p>
      </div>

      {/* Nombre y Apellido */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            {...register('nombre')}
            type="text"
            placeholder="Nombre"
            className="input-field"
            disabled={isSubmitting}
          />
          {errors.nombre && (
            <p className="error-message">{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('apellido')}
            type="text"
            placeholder="Apellido"
            className="input-field"
            disabled={isSubmitting}
          />
          {errors.apellido && (
            <p className="error-message">{errors.apellido.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Correo electrónico"
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <input
          {...register('whatsapp')}
          type="tel"
          placeholder="Número de WhatsApp"
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.whatsapp && (
          <p className="error-message">{errors.whatsapp.message}</p>
        )}
      </div>

      {/* Prenda fija */}
      <div>
        <input
          value={PRENDA_PREVENTA}
          disabled
          className="input-field text-gray-500 bg-gray-50 cursor-not-allowed"
        />
      </div>

      {/* Talla */}
      <div>
        <select
          {...register('talla')}
          className="input-field"
          disabled={isSubmitting}
        >
          <option value="">Selecciona tu talla</option>
          {TALLAS_DISPONIBLES.map((talla) => (
            <option key={talla.value} value={talla.value}>
              {talla.label}
            </option>
          ))}
        </select>
        {errors.talla && (
          <p className="error-message">{errors.talla.message}</p>
        )}
      </div>

      {/* Ciudad */}
      <div>
        <input
          {...register('ciudad')}
          type="text"
          placeholder="Ciudad"
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.ciudad && (
          <p className="error-message">{errors.ciudad.message}</p>
        )}
      </div>

      {/* Cantidad estimada */}
      <div>
        <input
          {...register('cantidad_estimada', { valueAsNumber: true })}
          type="number"
          min="1"
          max="5"
          placeholder="Cantidad de hoodies"
          className="input-field"
          disabled={isSubmitting}
        />
        {errors.cantidad_estimada && (
          <p className="error-message">{errors.cantidad_estimada.message}</p>
        )}
      </div>

      {/* Contacto preferido */}
      <fieldset className="space-y-2">
        <legend className="label-field">
          ¿Cómo prefieres que te contactemos? <span className="text-red-500">*</span>
        </legend>
        <div className="space-y-2">
          {CONTACTO_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                {...register('contacto')}
                type="radio"
                value={option.value}
                className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                disabled={isSubmitting}
              />
              <span className="ml-3 text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.contacto && (
          <p className="error-message">{errors.contacto.message}</p>
        )}
      </fieldset>

      {/* Usuario Instagram condicional */}
      {contactoSeleccionado === 'Instagram' && (
        <div>
          <input
            {...register('instagram_user')}
            type="text"
            placeholder="@usuario_instagram"
            className="input-field"
            disabled={isSubmitting}
          />
          {errors.instagram_user && (
            <p className="error-message">{errors.instagram_user.message}</p>
          )}
        </div>
      )}

      {/* Consent */}
      <div>
        <label className="flex items-start space-x-2">
          <input
            {...register('consent_marketing')}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            disabled={isSubmitting}
          />
          <span className="text-sm text-gray-600">
            Acepto ser contactado para la preventa{' '}
            <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consent_marketing && (
          <p className="error-message">{errors.consent_marketing.message}</p>
        )}
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
            Enviando...
          </span>
        ) : (
          'Registrarme'
        )}
      </button>

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

