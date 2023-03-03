import { useState } from 'react';
import PokemonType from '../../types/PokemonType';
import './TypeList.css';
import classNames from 'classnames';
import { TypeItem } from '../TypeItem/TypeItem';

type Props = {
    types: PokemonType[] | undefined,
    handleSelectType: (type: string) => void,
    selectedType: string,
}

export const TypeList: React.FC<Props> = ({ types, handleSelectType, selectedType }) => {
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
                    ? [{name: 'all'},...types].map(({ name }) => (
                        <li key={name} className={classNames('list-item', selectedType === name && 'selected')}>
                            <TypeItem
                                typeName={name}
                                handleSelectType={handleSelectType}
                            />
                        </li>
                    ))
                    : <div>Loading...</div>
                }
            </ul>
        </div>
    );
};