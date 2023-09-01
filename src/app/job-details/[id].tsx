import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useFetch } from '../../hook/useFetch';
import { COLORS, SIZES, icons } from '../../constants';
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components';
import { Fragment, useCallback, useState } from 'react';
import { Job } from '../../types/job.type';

// const data: Job[] = [
//   {
//     employer_name: 'Insight Global',
//     employer_logo:
//       'https://images.squarespace-cdn.com/content/5f7f984c3ca20d1d55b276f7/1619793549819-L54X3W9Z5RD277UPNH9S/IGLogoPublic.png?content-type=image%2Fpng',
//     job_id: 'goRnLUOEM8YAAAAAAAAAAA==',
//     job_title: 'Python Developer',
//     job_description:
//       'A large financial services client is seeking a Python Developer with experience in Azure Key Vault to join their growing team. This team is doing the initial implementation of Key Vault and building out a multi-cloud solution. This person will do access provisioning, credentials and storage. This role is hybrid in the office Tuesday-Thursday in one of the following locations: Malvern PA, Dallas TX, or Charlotte NC. Must Have Qualifications Strong Python development experience Experience working with Azure Key Vault Plusses: CyberArk tool suite',
//     job_country: 'US',
//     job_employment_type: 'FULLTIME',
//     job_highlights: {
//       Qualifications: [
//         'JavaScript, (React OR Angular OR Vue), Node, HTML, CSSS, API',
//       ],
//       Responsibilities: [
//         'Starting 6/5, you will be working in an agile team to help develop a new set of web applications for their own system and sub vendors',
//         'This role is hybrid and you will be required to go in to the office 3 days p/w',
//       ],
//       Benefits: [
//         '6-month contract (likely extension)',
//         'W2 - $70 - $75 p/h',
//         'C2C - $80 - $90 p/h',
//       ],
//     },
//     job_google_link:
//       'https://www.google.com/search?gl=us&hl=en&rciv=jb&q=web+developer+in+texas+usa&start=0&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=web+developer+in+texas+usa&htidocid=8yv3oA_2-UYAAAAAAAAAAA%3D%3D',
//   },
// ];

// const isLoading = false;
// const error = null;

const tabs = ['About', 'Qualifications', 'Responsibilities', 'Benefits'];

const JobDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: id as string,
  });

  const displayTabContent = () => {
    switch (activeTab) {
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No description'} />;
      case 'Qualifications':
        return (
          <Specifics
            title={'Qualifications'}
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        );
      case 'Responsibilities':
        return (
          <Specifics
            title={'Responsibilities'}
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        );
      case 'Benefits':
        return (
          <Specifics
            title={'Benefits'}
            points={data[0].job_highlights?.Benefits ?? ['N/A']}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: 'Job Details',
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
        }}
      />
      <Fragment>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            'https://careers.google.com/jobs/results'
          }
        />
      </Fragment>
    </SafeAreaView>
  );
};

export default JobDetails;
