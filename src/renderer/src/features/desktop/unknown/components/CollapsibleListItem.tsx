import { Hashtag, Search } from 'iconoir-react'

type Props = {}

export default function CollapsibleListItem({}: Props) {
  return (
    <div className='item'>
        <div className="text">CollapsibleListItem</div>
        <div className="buttons">
            <Hashtag className='btn'/>
            <Search className='btn'/>

        </div>

    </div>
  )
}