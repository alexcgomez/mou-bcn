/**
 * Validación de variables de entorno requeridas
 * Se ejecuta al inicio de la aplicación
 */

const requiredEnvVars = {
  TMB_APP_ID: process.env.TMB_APP_ID,
  TMB_APP_KEY: process.env.TMB_APP_KEY,
} as const;

export function validateEnv(): void {
  const missing: string[] = [];

  if (!requiredEnvVars.TMB_APP_ID) {
    missing.push("TMB_APP_ID");
  }

  if (!requiredEnvVars.TMB_APP_KEY) {
    missing.push("TMB_APP_KEY");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env.local file and ensure all required variables are set.\n" +
        "See .env.example for reference."
    );
  }
}

// Validar al importar el módulo (solo en servidor)
if (typeof window === "undefined") {
  validateEnv();
}
