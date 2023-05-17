import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-light text-center py-4">        
      <div className="container">
        <div className="row mt-4">
            <div className="col">
                <p className="text-muted">About the Project</p>
                <p>
                Court Forms Online is operated by Suffolk University Law School's Legal Innovation and Technology Lab.
                It began as a volunteer project in cooperation with the Massachusetts Access to Justice Commission's COVID-19 task force and volunteers
                from around the world. {" "}
                <Link href="/about">
                    Learn more...
                </Link>
                </p>
            </div>
            </div>
        <div className="row">
          <div className="col">
            <a href="https://suffolk.edu"><img src="/suffolk_law.png" alt="Suffolk University Law School" className="img-fluid mb-2 suffolk-logo" /></a>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link href="/privacy" className="text-muted">
              Terms of Use
            </Link>
          </div>
          <div className="col">
            <a href="mailto:massaccess@suffolk.edu" className="text-muted">Contact</a>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <p className="text-muted">© {new Date().getFullYear()} Suffolk University Law School</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
