export default function rootReducer(prevState, action) {
  switch (action.type) {
    case 'MOSTRAR_LINEAS':
        return {...prevState, Lineas: {...action.payload}};
    default:
  }
}