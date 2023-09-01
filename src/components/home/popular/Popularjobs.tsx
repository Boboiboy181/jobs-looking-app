import { Fragment, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

import styles from './popularjobs.style';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useFetch } from '../../../hook/useFetch';
import { Job } from '../../../types/job.type';

const exampleData: Job[] = [
  {
    employer_name: 'Insight Global',
    employer_logo:
      'https://images.squarespace-cdn.com/content/5f7f984c3ca20d1d55b276f7/1619793549819-L54X3W9Z5RD277UPNH9S/IGLogoPublic.png?content-type=image%2Fpng',
    job_id: 'goRnLUOEM8YAAAAAAAAAAA==',
    job_title: 'Python Developer',
    job_description:
      'A large financial services client is seeking a Python Developer with experience in Azure Key Vault to join their growing team. This team is doing the initial implementation of Key Vault and building out a multi-cloud solution. This person will do access provisioning, credentials and storage. This role is hybrid in the office Tuesday-Thursday in one of the following locations: Malvern PA, Dallas TX, or Charlotte NC. Must Have Qualifications Strong Python development experience Experience working with Azure Key Vault Plusses: CyberArk tool suite',
    job_country: 'US',
    job_employment_type: 'FULLTIME',
  },
];

const Popularjobs = () => {
  const router = useRouter();
  // const { data, isLoading, error } = useFetch('search', {
  //   query: 'javascript',
  //   num_pages: '1',
  //   page: '1',
  // });

  // console.log(data);

  const [selectedJob, setSelectedJob] = useState<string | undefined>();

  const handleCardPress = (item: Job) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const isLoading = false;
  const error = null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <Fragment>
            <FlatList
              data={exampleData}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              keyExtractor={(item: Job) => item?.job_id}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handlePress={handleCardPress}
                />
              )}
              horizontal={true}
            />
          </Fragment>
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
