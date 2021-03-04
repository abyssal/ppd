import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomeView() {
    return (
        <div style={{
            textAlign: 'left'
        }}>
            <div>
                The <span style={{color: 'lightblue', fontWeight: 'bold'}}>Progressive Pronoun Directory</span> is a website for you to share, express, and learn about pronouns.
            </div>
            <div style={{marginTop: '10px'}}>
                Here's some popular pronouns:
                <ul>
                    <li><a href='/she'>She/her</a></li>
                    <li><a href='/he'>He/him</a></li>
                    <li><a href='/they'>They/them</a></li>
                </ul>
            </div>
        </div>
    )
}