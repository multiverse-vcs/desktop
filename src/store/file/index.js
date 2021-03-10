import saga from './saga'
import slice from './slice'

export const actions = slice.actions

export default { reducer: slice.reducer, saga: saga }