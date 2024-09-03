import { type getDictionary } from '@/src/utils/getDictionary';

interface ButtonProps {
  t: Awaited<ReturnType<typeof getDictionary>>['basic'];
}

export default ButtonProps;
