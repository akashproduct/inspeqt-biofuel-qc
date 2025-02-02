export default function imageLoader({ src }) {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://akashproduct.github.io/inspeqt-biofuel-qc' 
    : ''
  return `${baseUrl}${src}`
} 