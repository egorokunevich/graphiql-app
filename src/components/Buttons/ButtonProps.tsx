/* eslint-disable semi */
import { type getDictionary } from '@/src/utils/getDictionary';

export default interface ButtonProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}
