/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '@kalimahapps/vue-icons' {
  import type { DefineComponent } from 'vue'

  // Déclaration générique pour tous les composants d'icônes de Kalimah
  const IoOutlineAirplane: DefineComponent<{}, {}, any>
  const BsCalendar3: DefineComponent<{}, {}, any>
  const AkPencil: DefineComponent<{}, {}, any>
  const PhFillUsers: DefineComponent<{}, {}, any>
  const AkPaper: DefineComponent<{}, {}, any>
  const AnOutlinedDollarCircle: DefineComponent<{}, {}, any>

  export { IoOutlineAirplane, BsCalendar3, AkPencil, PhFillUsers, AkPaper, AnOutlinedDollarCircle }
}