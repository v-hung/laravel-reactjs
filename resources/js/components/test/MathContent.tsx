import React from 'react'
import InlineMath from "./InlineMath";

const MathContent = ({ mathString }: { mathString: string }) => {
  const regex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g
  const matches: string[] = mathString.match(regex) || [];

  const contentArray = mathString.split(regex).reduce<{
    type: string, content: string
  }[]>((pre, cur, index) => {
    return cur ? [...pre,  {
      type: matches.length > 0 && matches.indexOf(`$${cur}$`) >= 0 ? 'math' : 'text',
      content: cur,
    }] : pre
  }, [])

  return (
    <>
      {contentArray.map((item, index) => (
        <React.Fragment key={index}>
          {item.type == "text"
            ? item.content
            : <InlineMath key={index} math={item.content} />
          }
          
        </React.Fragment>
      ))}
    </>
  )
}

export default React.memo(MathContent)