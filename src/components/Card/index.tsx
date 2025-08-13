import React from 'react'
import {formatChange} from '@/lib/plausible'

interface CardProps {
  title: string
  value: string | number
  change?: number | null
  formatter?: (value: any) => string
  positiveIsGood?: boolean
}

export const Card = (props: CardProps) => {
  const {title, value, change, formatter, positiveIsGood} = props
  const formattedValue = formatter ? formatter(value) : value
  const changeData = formatChange(change || null)
  const isPositive = positiveIsGood ? changeData.isPositive : !changeData.isPositive

  return <li>
     <div className="card" style={{flexDirection: 'column'}}>
       <h3 className="card__title">{title}</h3>
       <div style={{fontSize: '2rem'}}>
         {formattedValue}
       </div>
       {change !== undefined && <div style={{ color: isPositive ? 'green' : 'red'}}>
         {changeData.text} from previous period
       </div>}
     </div>
  </li>
}