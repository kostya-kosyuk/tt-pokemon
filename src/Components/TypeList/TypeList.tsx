import { useEffect, useRef, useState } from 'react';
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
    const [isTypesHidden, setTypesHidden] = useState(true);
    const typesWrapperRef = useRef<HTMLDivElement>(null);

    const handleShowTypes = () => setTypesHidden(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (typesWrapperRef.current && !typesWrapperRef.current.contains(event.target as Node)) {
                setTypesHidden(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [typesWrapperRef]);

    return (
        <div className='filter-container'>
            <div className="icon-wrapper">
                Filter
                <img onClick={handleShowTypes} className={classNames('icon', isTypesHidden || 'reversed')} src="./arrow-icon.svg" alt="arrow-icon" />
            </div>
            <div ref={typesWrapperRef} className={classNames("types-wrapper", isTypesHidden && 'hidden')}>
                <ul className={classNames(`types-list`)}>
                    {types
                        ? [{ name: 'all' }, ...types].map(({ name }) => (
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
        </div>
    );
};