import { SVGProps } from 'react'

export function IconLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        d="M191.971 176l-64.008-40l-63.992 40v48l63.992-40l64.008 40v-48z"
        opacity=".2"
        fill="currentColor"
      ></path>
      <path
        d="M183.97 32h-112a16.018 16.018 0 0 0-16 16v176a8 8 0 0 0 12.24 6.784l59.754-37.35l59.767 37.35a8 8 0 0 0 12.24-6.784V48a16.018 16.018 0 0 0-16-16zm0 16v113.567l-51.767-32.351a8.001 8.001 0 0 0-8.48 0l-51.752 32.349V48zm-51.767 129.216a8.001 8.001 0 0 0-8.48 0l-51.752 32.35v-29.132l55.993-35l56.007 35v29.133z"
        fill="currentColor"
      ></path>
    </svg>
  )
}
