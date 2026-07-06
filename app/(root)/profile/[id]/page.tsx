import { auth } from '@/auth';
import ProfileLink from '@/components/user/ProfileLink';
import UserAvatar from '@/components/UserAvatar';
import { getUsersQuestions, getUsers, getUsersAnswers, getUserTopTags } from '@/lib/actions/user.action'
import { notFound } from 'next/navigation';

import dayjs from "dayjs";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Stats from '@/components/user/Stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataRenderer from '@/components/DataRenderer';
import QuestionCard from '@/components/cards/QuestionCard';
import Pagination from '@/components/Pagination';
import { EMPTY_ANSWERS, EMPTY_QUESTION, EMPTY_TAGS } from '@/constants/states';
import AnswerCard from '@/components/cards/AnswerCard';
import TagCard from '@/components/cards/TagCard';

const Profile = async ({  params, searchParams}: RouteParams) => {
  const { id } = await params;
  const { questionPage, questionPageSize, answerPage, answerPageSize } = await searchParams;

  if (!id) notFound();

  const loggedInUser = await auth();

  const { success, data, error } = await getUsers({
    userId: id
  });
  
  if (!success) return ( 
    <div>
      <div className="h1-bold  text-dark100_light900">{error?.message}</div>
    </div>
  );     

  const { user, totalQuestions, totalAnswers } = data!;

  const {
    success: userQuestionsSuccess, 
    data: userQuestions,
    error: userQuestionsError,
  } = await getUsersQuestions({
    userId: id,
    page: Number(questionPage) || 1,
    pageSize: Number(questionPageSize) || 10,
  });

  const { questions, isNext: hasMoreQuestions } = userQuestions ?? { questions: [], isNext: false };

  const {
    success: userAnswersSuccess, 
    data: userAnswers,
    error: userAnswersError,
  } = await getUsersAnswers({
    userId: id,
    page: Number(answerPage) || 1,
    pageSize: Number(answerPageSize) || 10,
  });

  const { answers, isNext: hasMoreAnswers } = userAnswers ?? { answers: [], isNext: false };

  const {
    success: userTopTagsSuccess, 
    data: userTopTags,
    error: userTopTagsError,
  } = await getUserTopTags({
    userId: id,
  });

  const { tags } = userTopTags!;
  
  const { _id, name, image, portfolio, location, createdAt, username, bio } = user;


  return (
    <>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar 
            id={_id}
            name={name}
            imageUrl={image}
            className="size-35 rounded-full object-cover"
            fallbackClassName="text-6xl fond-bolder"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {portfolio && (
                <ProfileLink 
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink 
                  imgUrl="/icons/location.svg"
                  title="Location"
                />
              )}
              <ProfileLink 
                imgUrl="/icons/calendar.svg"
                title={dayjs(createdAt).format("MMM YYYY")}
              />
            </div>

            {bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">{bio}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {loggedInUser?.user?.id === id && (
            <Link href="/profile/edit">
              <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-12 min-w-44 px-4 py-3'>
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </section>

      <Stats 
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
        }}
      />

      <section className='mt-10 flex gap-10'>
        <Tabs defaultValue="top-posts" className="flex-2">
          <TabsList className="background-light800_dark400 min-h-10.5 p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-5 flex w-full flex-col gap-6">
            <DataRenderer
              empty={EMPTY_QUESTION}
              success={userQuestionsSuccess}
              error={userQuestionsError}
              data={questions}
              render={(questions) => (
                <div className='flex w-full flex-col gap-6'>
                  {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))}
                </div>
              )}
            />

            <Pagination page={Number(questionPage) || 1} isNext={hasMoreQuestions} queryKey="questionPage" />
          </TabsContent>


          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <DataRenderer
              empty={EMPTY_ANSWERS}
              success={userAnswersSuccess}
              error={userAnswersError}
              data={answers}
              render={(answers) => (
                <div className='flex w-full flex-col gap-6'>
                  {answers.map((answer) => (
                    <AnswerCard 
                      key={answer._id} 
                      {...answer} 
                      containerClasses="card-wrapper rounded-[10px] px-7 py-9 sm:px-11 "
                      showReadMore
                      content={answer.content.slice(0, 27)}
                    />                  
                  ))}
                </div>
              )}
            />

            <Pagination page={Number(answerPage) || 1} isNext={hasMoreAnswers || false} queryKey="answerPage" />
          </TabsContent>
        </Tabs>

        <div className="flex w-full min-w-62.5 flex-1 flex-col max-lg:hidden">
          <h3 className='h3-bold text-dark200_light900'>Top Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            <DataRenderer
              empty={EMPTY_TAGS}
              success={userTopTagsSuccess}
              error={userTopTagsError}
              data={tags}
              render={(tags) => (
                <div className='mt-3 flex w-full flex-col gap-4'>
                  {tags.map((tag) => (
                    <TagCard 
                      key={tag._id} 
                      _id={tag._id} 
                      name={tag.name} 
                      questions={tag.count} 
                      showCount
                      compact
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile