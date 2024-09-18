import Link from 'next/link';
import Image from 'next/image';
import { Interface } from 'readline';
import styles from '../css/ThankYou.module.css';

interface Organization {
  name: string;
  url: string;
  icon: string;
  width: number;
  height: number;
}

const organizations: Array<Organization> = [
  {
    name: 'Legal Innovation and Technology Lab',
    url: 'https://suffolklitlab.org',
    icon: 'lit-lab-logo-small.svg',
    width: 187,
    height: 112.4,
  },
  {
    name: 'Massachusetts Access to Justice Commission',
    url: 'https://massa2j.org',
    icon: 'a2j_logo.png',
    width: 141,
    height: 35,
  },
  {
    name: 'Docassemble',
    url: 'https://docassemble.org',
    icon: 'docassemble_logo.png',
    width: 131,
    height: 61,
  },
  {
    name: 'Civil Legal Aid for Victims of Crime',
    url: 'https://massclavc.org/',
    icon: 'clavc_logo.png',
    width: 91,
    height: 60,
  },
  {
    name: 'Greater Boston Legal Services',
    url: 'https://www.gbls.org',
    icon: 'gbls_logo.png',
    width: 163,
    height: 60,
  },
  {
    name: 'Northeast Legal Aid',
    url: 'https://www.northeastlegalaid.org/',
    icon: 'ne_legal_aid_logo.png',
    width: 90,
    height: 60,
  },
  {
    name: 'Theory and Principle',
    url: 'https://www.theoryandprinciple.com/',
    icon: 'tp_logo.png',
    width: 141,
    height: 40,
  },
  {
    name: 'NuLawLab',
    url: 'https://www.nulawlab.org/',
    icon: 'nulawlab_logo.png',
    width: 152,
    height: 35,
  },
  {
    name: 'AppGeo',
    url: 'https://www.appgeo.com/',
    icon: 'appgeo_logo.png',
    width: 106,
    height: 45,
  },
  {
    name: 'Bentley University Court UX Team',
    url: 'https://www.bentley.edu/academics/graduate-programs/masters-human-factors/',
    icon: 'court_UX_logo.png',
    width: 147,
    height: 60,
  },
  {
    name: 'Community Lawyer',
    url: 'https://afterpattern.com/',
    icon: 'cl_logo.png',
    width: 137,
    height: 40,
  },
  {
    name: 'Gavel',
    url: 'https://gavel.io',
    icon: 'gavel_logo.png',
    width: 103,
    height: 32,
  },
  {
    name: 'Massachusetts Law Reform Institute',
    url: 'https://mlri.org/',
    icon: 'mlri_logo.png',
    width: 187,
    height: 39,
  },
];

export default function ThankYou() {
  return (
    <section className={styles.ThankYouSection + ' container'}>
      <h2>Thank You</h2>
      <p>
        The organizations listed below all helped build the first version of
        Court Forms Online. It would not exist without their help.
      </p>
      <div
        className={
          styles.ThankYouPartners +
          ' row row-cols-3 row-cols-md-6 g-4 mb-5 align-items-center'
        }
      >
        {organizations.map((org) => {
          return (
            <div className="col" key={org.name}>
              <Link href={org.url} className="d-block">
                <Image
                  src={'/partners/' + org.icon}
                  alt={org.name}
                  height={org.height}
                  width={org.width}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
