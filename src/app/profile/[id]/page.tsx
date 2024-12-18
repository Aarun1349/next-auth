export default function ProfilePage({params}:any){
    return(<div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Profile</h1>
    <hr/>
    <p className="text-4xl">Profile for user :{params.id}</p>
    </div>)
}