import {FC} from 'react';
import classNames from 'classnames';

type ItemProps = {
  label: string;
  children: JSX.Element;
  tips?: string;
  className?: string;
}

const Item: FC<ItemProps> = ({
  label,
  children,
  tips,
  className
}) => {
  return (
    <div className={classNames(className, 'flex flex-col justify-start items-start border-b py-2')}>
      <label className="mb-2">{label}:</label>
      {children}
      {tips && <p className="text-slate-400 text-[12px]">{tips}</p>}
    </div>
  );
}

export default Item;
