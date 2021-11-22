
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const options = {
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment]
      }, []);
    }
}

export default function RichText({ text }) {
    return documentToReactComponents(text.json, options)
}

const optionsForUnstyledList = {
    renderNode: {
        [BLOCKS.UL_LIST]: (node, children) => {
            return <ul className="list-unstyled mt-3 mb-1">{children}</ul>
        }
    }
}

export function RichTextWithUnstyledList({ text }) {
    return documentToReactComponents(text.json, optionsForUnstyledList)
}