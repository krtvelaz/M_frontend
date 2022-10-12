import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IIndicator } from '../../custom_types';
import { actions } from '../../redux';

const StatisticsLanding = () => {
    const dispatch = useDispatch<any>();
    useEffect(() => {
        dispatch(actions.get_statistics());
    }, []);

    const statistics: IIndicator[] = useSelector((store: any) => store.banner.statistics.value);

    return (
        <section className="row statistics">
            {statistics?.map((statistic: any) => (
                <div className="col-6 col-md-3">
                    <div className="img-number">
                        <p className="">{statistic?.sta_value}</p>
                    </div>
                    <p>{statistic?.sta_description}</p>
                </div>
            ))}
        </section>
    );
};

export default StatisticsLanding;
