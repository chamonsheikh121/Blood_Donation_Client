import PropTypes from 'prop-types'

import ImpressionCounterComponent from '../../Hooks/ImpressionCounterComponent';
import PostDetails from './PostDetails';

const BlogCard = ({ blog, currentId }) => {
    console.log(currentId);
    const { _id, name, email, publisherImage, blogTitle, description, date, time, thumbnail } = blog
    return (
        <div className='mb-20 ' id={_id}>

            <div

                className='pb-10 space-y-5'>
                <div className='md:h-[400px] flex items-center justify-center bg-gradient-to-b from-purple-700 to-violet-700 relative'>
                    <div className='w-[60px] z-10 absolute top-2 left-2 p-1 flex items-center gap-5 bg-white rounded-full h-[60px]'>
                        <img className='w-full object-cover rounded-full h-full' src={publisherImage} alt="" />
                        <div className=''>
                            <h1 className="text-xl  font-bold text-gray-200">{name}</h1>
                            <p className='text-sm text-gray-400'>{email}</p>
                        </div>
                    </div>
                    {
                        !thumbnail && <h1 className="text-3xl font-bold text-white">{blogTitle}</h1>
                    }
                    {
                        thumbnail && <img className="w-full md:h-full object-cover" src={thumbnail} alt="" />
                    }
                </div>
                <h3 className='text-2xl pl-1 font-semibold'>{blogTitle}</h3>
                <p className='text-md '>{description}</p>
                <div className='font-semibold '>
                    <p>Published date :</p>
                    <span>{date} ,  {time}</span>
                </div>

            </div>
            <PostDetails post={blog}></PostDetails>
            <hr className='border-gray-300 mt-5' />

            {
                _id && <ImpressionCounterComponent id={_id}></ImpressionCounterComponent>
            }
        </div>
    );
};

export default BlogCard;
BlogCard.propTypes = {
    blog: PropTypes.object,
    currentId: PropTypes.string
}