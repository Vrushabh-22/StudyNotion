
import ProfileImage from './SettingsComponents/ProfileImage'
import ProfileInformation from './SettingsComponents/ProfileInformation'
import DeleteAccount from './SettingsComponents/DeleteAccount'
import ChangePassword from './SettingsComponents/ChangePassword'

const Settings = () => {

  return (
    <section>
        <div className='w-[90%] lg:w-[60%] mx-auto px-4 space-y-14'>
            <h1 className='text-[1.875rem] text-richblack-5 font-medium'>Edit Profile</h1>
            <div className='space-y-12'>

                <ProfileImage />

                <ProfileInformation />

                <ChangePassword/>

                <DeleteAccount />

            </div>
        </div>
    </section>
  ) 
}

export default Settings