import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css'; // Importando o arquivo de estilos do Tailwind CSS

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;