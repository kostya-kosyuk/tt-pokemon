import { useState } from 'react';
import PokemonType from '../../types/PokemonType';
import './TypeList.css';
import classNames from 'classnames';

type Props = {
    types: PokemonType[] | undefined,
    handleSelectType: (type: string) => void,
}

export const TypeList: React.FC<Props> = ({ types, handleSelectType }) => {
    const [isTypesHidden, setTypesHidden] = useState(false);

    const handleShowTypes = () => setTypesHidden(prev => !prev);

    return (
        <div className='types-wrap'>
            <div className='filter'>
                <div>Filter</div>
                <img onClick={handleShowTypes} className={classNames('icon', isTypesHidden && 'reversed')} src="./arrow-icon.svg" alt="arrow-icon" />
            </div>
            <ul className={classNames(`types-list`, isTypesHidden && 'show')}>
                {types
                    ? types.map(({ name }) => (
                        <li key={name} className='list-item'>
                            <span className={classNames(`t-type type-${name}`)}>
                                <a
                                    href={`#${name}`}
                                    title={`${name} type`}
                                    onClick={() => handleSelectType(name)}
                                >
                                    <span className="t-type2">
                                        {name}
                                    </span>
                                </a>
                            </span>
                        </li>
                    ))
                    : <div>Loading...</div>
                }
            </ul>
        </div>
    );
};