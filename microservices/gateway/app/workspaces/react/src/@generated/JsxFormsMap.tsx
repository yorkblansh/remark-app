import { Form16 } from '../forms/form16/Form16'
import { form16Props } from '../forms/form16/form16Props'
import { Form23a } from '../forms/form23a/Form23a'
import { form23aProps } from '../forms/form23a/form23aProps'
export const JsxFormsMap = {
form16: () => {
                import('../forms/form16/index.scss')
                return <Form16 {...form16Props} />
            },
form23a: () => {
                import('../forms/form23a/index.scss')
                return <Form23a {...form23aProps} />
            },}