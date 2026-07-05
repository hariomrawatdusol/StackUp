'use client'
export default function GradientBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="blob" style={{width:520,height:520,background:'#7B2FFF',top:'-140px',left:'-120px',animationDelay:'0s'}} />
      <div className="blob" style={{width:480,height:480,background:'#00C2FF',top:'30%',right:'-120px',animationDelay:'-6s'}} />
      <div className="blob" style={{width:560,height:560,background:'#FF2E7E',bottom:'-160px',left:'20%',animationDelay:'-12s'}} />
    </div>
  )
}
