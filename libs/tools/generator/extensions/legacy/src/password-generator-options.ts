import { PassphraseGenerationOptions, PasswordGenerationOptions } from "@bytewarden/generator-core";
import { GeneratorNavigation } from "@bytewarden/generator-navigation";

/** Request format for credential generation.
 *  This type includes all properties suitable for reactive data binding.
 */
export type PasswordGeneratorOptions = PasswordGenerationOptions &
  PassphraseGenerationOptions &
  GeneratorNavigation & { policyUpdated?: boolean };
